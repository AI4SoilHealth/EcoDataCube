class $stream {
  constructor() {
    this.reader = null;
  }

  async getStream(config = {}) {
    try {


      const response = await fetch(config.url, config.settings);
      console.log(response.body)
      this.reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let chunks = [];

      while (true) {
        const { done, value } = await this.reader.read();

        if (done) {
          config.onEnd(chunks);
          this.reader = null;
          return;
        }
        let formated = config.onFormatValue(decoder.decode(value, { stream: true }));
        chunks = [...chunks, ...formated];
        // if (chunks.length % 10 === 0) {
        //   config.onSetData(chunks);
        // }
        config.onSetData(chunks);
    
      }

    } catch (e) {
      config.onError(e)
    }
  }

  cancel() {
    if (this.reader) {
      this.reader.cancel();
      this.reader = null;
    }
  }
}

export default new $stream();