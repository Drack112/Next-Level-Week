import Image from "../models/Image";

import "dotenv/config";

const PORT = process.env.PORTA;

export default {
  render(image: Image) {
    return `http://localhost:${PORT}/images/${image.path}`;
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
