const formulePn = (
  n: number,
  ro: number,
  factorial: number,
  Po: number,
  servers: number
): number => {
  if (n < servers) {
    return (Math.pow(ro, n) / factorial) * Po
  } else {
    return (Math.pow(ro, n) / factorial) * Math.pow(servers, n - servers) * Po
  }
}

const objectArrayPn = { n: 0 as number, result: 0 as number }

export default class {
  public servers = 2
  public _lambda = 0
  public _miu = 0
  public limit = 0
  public typeTime = ''

  public constructor(
    lambda: number,
    miu: number,
    typeTime: string,
    limit: number,
    servers: number = 2
  ) {
    this.typeTime = typeTime
    this.limit = limit
    this.lambda = lambda
    this.miu = miu
    this.servers = servers
  }

  // tiempo promedio de llegada de usuarios
  public averageArrivalTime(): number {
    const division = 1 / this.lambda
    return (Math.random() * (division * 2 - division / 2) + division / 2) * 60
  }

  // tiempo de uso promedio del servidor
  public averageUseTime(): number {
    const division = 1 / this.miu
    return (Math.random() * (division * 2 - division / 2) + division / 2) * 60
  }

  // average server time | tiempo promedio en cola
  public wq(): number {
    return this.lq() / this.lambda
  }

  set lambda(lambda: number) {
    this._lambda = this.typeTime === 'h' ? lambda : lambda * 60
  }

  get lambda(): number {
    return this._lambda
  }

  set miu(miu: number) {
    this._miu = this.typeTime === 'h' ? miu : miu * 60
  }

  get miu(): number {
    return this._miu
  }

  // probability that there are no people on the servers
  // probabilidad de que no haya personas en los servidores
  public ws(): number {
    return this.ls() / this.lambda
  }

  // probability of empty servers | probabilidad de que el sistema este vacío
  public po(): number {
    const factorialServer = this.factorial(this.servers)
    let rightPartForm: number
    if (this.limit > 0) {
      rightPartForm =
        1 /
        (1 - Math.pow(this.lambda / (this.servers * this.miu), this.servers))
    } else {
      rightPartForm =
        this.ro() / this.servers !== 1
          ? 1 -
            (1 -
              Math.pow(this.ro() / this.servers, this.limit - this.servers + 1))
          : this.limit - this.servers + 1
    }
    const divisionOfFactorialServer =
      Math.pow(this.ro(), this.servers) / factorialServer

    let sumOfFactorial = 0
    for (let i = 0; i < this.servers; i++) {
      sumOfFactorial += Math.pow(this.ro(), i) / this.factorial(i)
    }

    return 1 / ((sumOfFactorial + divisionOfFactorialServer) * rightPartForm)
  }

  // average queue time | cantidad promedio de usuarios en el sistema
  public ls(): number {
    if (this.limit > 0) {
      return this.lq() + this.lambdaEffective() / this.miu
    } else {
      return this.lq() + this.ro()
    }
  }

  public pN(): Array<typeof objectArrayPn> {
    let values = [] as Array<typeof objectArrayPn>
    if (this.limit > 0) {
      for (let n = 0; n <= this.limit; n++) {
        values.push({
          n,
          result: formulePn(
            n,
            this.ro(),
            this.factorial(n),
            this.po(),
            this.servers
          ),
        })
      }
      values = values.filter((value) => {
        return Number.parseFloat(value.result.toFixed(4)) > 0
      })
    } else {
      let n = 0
      while (
        values.length > 0
          ? Number.parseFloat(values[values.length - 1].result.toFixed(4)) > 0
          : true
      ) {
        values.push({
          n,
          result: formulePn(
            n,
            this.ro(),
            this.factorial(n),
            this.po(),
            this.servers
          ),
        })
        n++
      }
    }
    return values
  }

  public lambdaEffective(): number {
    const pn = this.pN()
    return this.lambda * (1 - pn[pn.length - 1].result)
  }

  // average number of users in queue | cantidad promedio de usuarios en cola
  public lq(): number {
    if (
      this.limit === 0 ||
      (this.limit > 0 && this.ro() / this.servers !== 1)
    ) {
      return (
        this.po() *
        (Math.pow(this.ro(), this.servers + 1) /
          (this.factorial(this.servers - 1) *
            Math.pow(this.servers - this.ro(), 2)))
      )
    } else {
      return (
        this.po() *
        (((Math.pow(this.ro(), this.servers) *
          (this.limit - this.servers) *
          (this.limit - this.servers + 1)) /
          2) *
          this.factorial(this.servers))
      )
    }
  }

  public ro(): number {
    return this.lambda / this.miu
  }

  public factorial(num: number): number {
    let factorial = 1
    for (let i = 2; i <= num; i++) {
      factorial *= i
    }
    return factorial
  }
}
