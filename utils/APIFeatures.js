class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {}

  sort() {
    // If we have the query parameter to sort the results, we will appned to the query,
    // or else, we can simply sort them based on the verified products
    if (this.queryObj.sort) {
    } else {
    }
  }
}
