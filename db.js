function DbModel(_tableName, _db) {
    this.tableName = _tableName || '';

	this.db = _db || app.local.db || null;
}

DbModel.prototype.returnArray = function(r) {
	var itemsColl = [];

	for (var i = 0; i < r.rows.length; i++) {
		itemsColl[i] = r.rows.item(i);
	}

	return itemsColl;
}

DbModel.prototype.query = function(query, successHandler, errorHandler) {
	var self = this;

	if (!this.db || !this.db.transaction) return;

	this.db.transaction(function(tx) {
	   tx.executeSql(query, [], function (tx, results) {
	      if (successHandler) successHandler(self.returnArray(results));
	  }, function(tx, error) {
		  if (errorHandler) {
			  errorHandler("Error : " + error.message + " in " + query);
	  	  } else {
			  console.log("Error : " + error.message + " in " + query);
		  }
	  });
  	});
}
