import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("1.8.0", (api) => {
    api.modifyClass("component:modal/create-account", {
        didInsertElement: function(){
             if (this.get("nameValidation.ok")) {
                 
  const name = this.accountName.trim().split(/\s/)[0];
  
  if (name.length) {
    // Assuming User.checkUsername returns a Promise
    User.checkUsername(name, this.accountEmail)
      .then((result) => {
        if (result.suggestion) {
          this.setProperties({
            accountUsername: result.suggestion,
            prefilledUsername: result.suggestion,
          });
        } else {
          this.setProperties({
            accountUsername: name,
            prefilledUsername: name,
          });
        }
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
  }
}

            
        }     
    });
});
