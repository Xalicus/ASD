function (doc) {
  if (doc._id.substr(0, 7) === "course:") {
    emit(doc._id.substr(7), {
    	"title": doc.title,
    	"acronym": doc.acronym,
    	"month": doc.month,
    	"program": doc.program
    });
  }
};