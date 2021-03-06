import {
    CREATE_PET,
    RETRIEVE_PETS,
    UPDATE_PET,
    DELETE_PET,
} from "./actionTypes";
import PetsService from "./petsService";

export const createPet =  (name, animal, breed, location, age, sex, selectedfoodarray) => async (dispatch) => {
        try {

            console.log('actionsjs-createPet-', selectedfoodarray);
            //const cloneData = Object.assign({}, selectedfoodarray);
    
             var foods =selectedfoodarray.reduce(function(result, item, index) {
                var key = Object.keys(item)[0]; 
                var value = item[key];            
                result.push(value);
                return result;
              }, []);
              console.log('actionsj - createPet-cloneData', foods);

            const res = await PetsService.create({
                name,
                animal,
                breed,
                location,
                age,
                sex,
                foods
            });
            
            dispatch({
                type: CREATE_PET,
                payload: res.data.data,                
            });
            return Promise.resolve(res.data.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

export const retrievePets = () => async (dispatch) => {
    try {
        const res = await PetsService.getAll().then((response) => {
        console.log('actions.js-retrievepets',response );
            dispatch({
                type: RETRIEVE_PETS,
                payload: response.data.data,
            });

          });   
             
        
    } catch (err) {
        console.log(err);
    }
};

export const updatePet = (id, data, selectedfoodarray2) => async (dispatch) => {
    try {
        console.log('actionsjs-updatepet-', selectedfoodarray2);
        const cloneData = Object.assign({}, data);

         var modiifedFood =selectedfoodarray2.reduce(function(result, item, index) {
            var key = Object.keys(item)[0]; 
            var value = item[key];            
            result.push(value);
            return result;
          }, []);

          cloneData.foods = modiifedFood;
          console.log('actionsj - updatepet-cloneData', cloneData);

        const res = await PetsService.update(id, cloneData);
        dispatch({
            type: UPDATE_PET,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deletePet = (id) => async (dispatch) => {
    try {
        await PetsService.delete(id);
        dispatch({
            type: DELETE_PET,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};



export const pageDesignerAction =  (name, animal, breed, location, age, sex, selectedfoodarray) => async (dispatch) => {
    try {

        console.log('pageDesignerAction-');
        
    } catch (err) {
        return Promise.reject(err);
    }
};