import axios from "axios";
import { getConfiguration } from './../services/configuration-service';

const configuration = getConfiguration();
axios.defaults.baseURL = configuration.baseUrl;

/**
 * 
 * A super simple data adapter
 * 
 */
export const dataAdapter = {
  get: async (model, options) => {
    const response = await axios.get(model);
    return response.data;
  }
}
