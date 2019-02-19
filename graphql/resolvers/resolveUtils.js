export const getSelectedAttributes = (model, info, selectionSet) => {
  /**
   * Request schema can sometimes have fields that do not exist in the table for the Model requested.
   * Here, we get all model attributes and check the request schema for fields that exist as 
   * attributes for that model.
   * Those are the attributes that should be selected from the sequelize query
   * 
   * info is supplied from the top-level model
   * selectionSet is supplied from child models
   */
  const selections = info !== null ? info.fieldNodes[0].selectionSet.selections : selectionSet.selections;

  // Initialise the list of selected attributes
  let selectedAttributes = [];

  // Get the field names for the model
  let modelAttributes = Object.keys(model.rawAttributes);
  
  selections.map(i => {
    let fieldName = i.name.value;
    // let isModelAttribute = modelAttributes.find(item => item === fieldName) ? true : false;
    let isModelAttribute = i.selectionSet === undefined ? true : false;

    if (isModelAttribute) {
      selectedAttributes.push(fieldName);
    }
  });

  return selectedAttributes;
}

export const getIncludeModel = (models, includeKeyName) => {
  const includeModels = {
    articles: models.Article,
    article: models.Article,
    owner: models.User,
    category: models.Category,
  };

  return includeModels[includeKeyName];
}

export const getSelectedIncludes = (models, model, info) => {
  /**
   * Request schema can sometimes have includes models
   */
  const selections = info.fieldNodes[0].selectionSet.selections;

  let selectedIncludes = [];
  
  selections.map(item => {
    let fieldName = item.name.value;
    // direct fields have selectionSet as undefined
    // included models fields have selectionSet
    let isIncludedProp = item.selectionSet !== undefined;

    if (isIncludedProp) {
      const includedModel = getIncludeModel(models, fieldName);
      const selectedAttributes = getSelectedAttributes(includedModel, null, item.selectionSet);

      

      const includeOption = {
        model: includedModel,
        as: fieldName,
        attributes: selectedAttributes
      }

      selectedIncludes.push(includeOption);
    }
  });

  return selectedIncludes;
}