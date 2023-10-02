class Info {

    updateVariableDescription(data, selectedDepvar, selectedIndepvar) {

        var desc = '';

        if (data) {
            if (selectedDepvar) {
                desc += "<h3>Dependent variable</h3>" + data.getDescription(selectedDepvar);
            }
            
            if (selectedIndepvar) {
                desc += "<h3>Independent variable</h3>" + data.getDescription(selectedIndepvar);
            }
        }

        document.getElementsByName("variables_description")[0].innerHTML = desc;
    }
};

export default Info;