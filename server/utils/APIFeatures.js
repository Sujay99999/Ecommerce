class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  countTotalDocuments() {
    this.count = this.query.countDocuments();
    return this;
  }

  filter() {
    // This query method depends on the exact text present on the query key value
    console.log("filter called");
    let queryObjTwin = { ...this.queryObj };
    const excludeKeysArr = [
      "page",
      "limit",
      "sort",
      "feildsCapacity",
      "verified",
      "brand",
    ];
    excludeKeysArr.forEach((el) => {
      delete queryObjTwin[el];
    });
    let filterStr = JSON.stringify(queryObjTwin);
    // console.log(filterStr);

    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    console.log(JSON.parse(filterStr));
    // We are chaining a new query, to the previous query that is present in this.query
    this.query = this.query.find(JSON.parse(filterStr));
    //console.log(this);
    return this;
  }

  match() {
    if (this.queryObj.verified) {
      console.log("match called");
      this.query = this.query.find({
        technicalDetails: { $exists: true, $ne: [] },
      });
    }
    return this;
  }

  filterSpecific() {
    if (this.queryObj.brand) {
      console.log(this.queryObj.brand);
      this.query = this.query
        .find({
          technicalDetails: { $exists: true, $ne: [] },
        })
        .find({
          "technicalDetails.detail": "Brand",
          "technicalDetails.value": this.queryObj.brand,
        });
    }
    return this;
  }

  sort() {
    console.log("sort called");
    // If we have the query parameter to sort the results, we will appned to the query,
    // or else, we can simply sort them based on the verified products
    if (this.queryObj.sort) {
      //console.log(this.queryObj.sort);
      let sortStr = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortStr);
      return this;
    } else {
      this.query = this.query.sort("finalPrice");
      return this;
    }
  }

  select() {
    console.log("select called");
    if (this.queryObj.feildsCapacity === "low") {
      this.query = this.query.select(
        "-__v -technicalDetails -additionalDetails -reviewArr -id"
      );
    } else if (this.queryObj.feildsCapacity === "high") {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    this.pageValue = this.queryObj.page * 1 || 1;
    this.limitValue = this.queryObj.limit * 1 || 5;
    this.skipValue = (this.pageValue - 1) * this.limitValue;
    this.query = this.query.skip(this.skipValue).limit(this.limitValue);
    //console.log(this.pageValue);
    return this;
  }
}

module.exports = APIFeatures;
