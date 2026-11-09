import { domainStore } from '../config/dataStore.js';

export const DomainModel = {
  findAll() {
    return domainStore.read();
  },

  findById(id) {
    const domains = domainStore.read();
    return domains.find((d) => d.id === id) || null;
  },
};

export default DomainModel;

