import ImageKit from "imagekit";
import {
  ImageKit_private_key,
  ImageKit_public_key,
  ImakeKit_url_endpoint,
} from "../config";

const imageKit = new ImageKit({
  publicKey: ImageKit_public_key,
  privateKey: ImageKit_private_key,
  urlEndpoint: ImakeKit_url_endpoint,
});

export { imageKit };
