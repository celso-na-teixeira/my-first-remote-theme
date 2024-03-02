import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("1.8.0", (api) => {
    api.modifyClass("component:modal/create-account", {
        didInsertElement: function(){
            var nameValue = document.getElementById('new-account-name').value;
            var formattedName = nameValue.split(' ').slice(0, -1).join(' ');
            document.getElementById('new-account-username').value = formattedName;
        }     
    });
});
