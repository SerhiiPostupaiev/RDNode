class GeneralService {
  constructor() {
    if (this.constructor === GeneralService) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }
}

module.exports = { GeneralService };
