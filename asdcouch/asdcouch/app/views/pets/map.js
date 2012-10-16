function (doc) {
  if (doc._id.substr(0,5) === "pets:") {
    emit(doc._id.substr(5), {
    	"KoolPet Name": doc.petName,
    	"KoolPet Groups": doc.petGroups,
    	"Gender": doc.genderValue,
    	"Favorite KoolPet": doc.favePet,
    	"Koolness": doc.koolness,
    	"Comments": doc.comments
    });
  }
};