class Info {

    updateVariableDescription(data, selectedVar1, selectedVar2, selectedVar3) {

        var desc = '';

        if (data) {
            if (selectedVar1) {
                desc += "<h3>Variable 1</h3>" + data.getDescription(selectedVar1);
            }
            
            if (selectedVar2) {
                desc += "<h3>Variable 2</h3>" + data.getDescription(selectedVar2);
            }
                        
            if (selectedVar3) {
                desc += "<h3>Variable 3</h3>" + data.getDescription(selectedVar3);
            }
        }

        document.getElementsByName("variables_description")[0].innerHTML = desc;
    }
};

export default Info;