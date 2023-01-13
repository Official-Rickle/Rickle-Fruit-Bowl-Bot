const { v4, validate } = require("uuid");

const _sysUID = new Set();
const systemUID = () => {

  const getSysUID = () => {
    const newSysUID = v4();
    if (_sysUID.has(newSysUID))
      return systemUID();
    _sysUID.add(newSysUID);
    return newSysUID;
  };

  const isUID = (uid) => {
    return _sysUID.has(uid);
  };

  const isValid = (uid) => {
    return validate(uid);
  };

  const load = () => { };

  const save = () => { };

  return {
    getUID: () => {
      return getSysUID();
    },
    has: (uid) => {
      return isUID(uid);
    },
    isValidUID: (uid) => {
      return isValid(uid);
    },
    delete: (uid) => { 
      if(isUID(uid)) {
        return _sysUID.delete(uid);
      } else {
        return false;
      }
    },
    load: (filename, filepath) => { },
    save: (filename, filepath) => { }
  };
};

module.exports = { systemUID };
