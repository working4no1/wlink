class CustonFindByName {
  static search({ dataArray = [], search = "" }) {
    const result = dataArray.find((item) => item?.Name === search);
    return result?.Value || null;
  }
}

export default CustonFindByName;
