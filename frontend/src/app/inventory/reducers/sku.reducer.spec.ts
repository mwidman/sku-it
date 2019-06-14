import { Sku } from '../models/sku';
import { reducer, initialState } from './sku.reducer';
import { FetchSkus, FetchSkusSuccess, FetchSkusFailure, AddSku, AddSkuSuccess, AddSkuFailure } from '../actions/sku.actions';


describe('Sku Reducer', () => {
  const existingSkus = [
    { id: 1, name: 'Sku1', description: 'Sku 1', base_units: 'each', current_quantity: 1 },
    { id: 2, name: 'Sku2', description: 'Sku 2', base_units: 'each', current_quantity: 2 },
    { id: 3, name: 'Sku3', description: 'Sku 3', base_units: 'each', current_quantity: 3 },
  ];
  const skus = [
    { id: 3, name: 'Sku3', description: 'Sku 3', base_units: 'each', current_quantity: 10 },
    { id: 4, name: 'Sku4', description: 'Sku 4', base_units: 'each', current_quantity: 4 },
    { id: 5, name: 'Sku5', description: 'Sku 5', base_units: 'each', current_quantity: 5 },
  ];
  const skuNew = { name: 'Sku6', description: 'Sku 6', base_units: 'each', current_quantity: 20 };
  const skuAdded = { id: 6, name: 'Sku6', description: 'Sku 6', base_units: 'each', current_quantity: 20 };
  const serverErrors = {
    'name': 'This sku already exists'
  };

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const expected = initialState;
      const result = reducer(undefined, {} as any);

      expect(result).toBe(expected);
    });
  });

  describe('Fetch Skus', () => {
    it('should set fetching to true and fetchErrors to empty', () => {
      const expected = {
        ...initialState,
        fetching: true,
        fetchErrors: null
      };
      const action = new FetchSkus();

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Fetch Skus Success', () => {
    it('should set fetching to false', () => {
      const expected =  false;
      const action = new FetchSkusSuccess(skus);

      const result = reducer(initialState, action);

      expect(result.fetching).toEqual(expected);
    });

    it('should add all retrieved skus', () => {
      const expected = {
        ...initialState,
        entities: skus.reduce((acc, sku) => {
          acc[sku.id] = sku;
          return acc;
        }, {}),
        ids: skus.map((sku) => sku.id),
      };
      const action = new FetchSkusSuccess(skus);

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });

    it('should replace any existing skus', () => {
      const state = {
        ...initialState,
        entities: existingSkus.reduce((acc, sku) => {
          acc[sku.id] = sku;
          return acc;
        }, {}),
        ids: existingSkus.map((sku) => sku.id),
      };
      const expected = {
        ...initialState,
        entities: skus.reduce((acc, sku) => {
          acc[sku.id] = sku;
          return acc;
        }, {}),
        ids: skus.map((sku) => sku.id),
      };
      const action = new FetchSkusSuccess(skus);

      const result = reducer(state, action);

      expect(result).toEqual(expected);
    });

  });

  describe('Fetch Skus Failure', () => {

    it('should set fetching to false', () => {
      const expected =  false;
      const action = new FetchSkusFailure(serverErrors);

      const result = reducer(initialState, action);

      expect(result.fetching).toEqual(expected);
    });

    it('should set fetchErrors to returned error object', () => {
      const expected = {
        ...initialState,
        fetchErrors: serverErrors,
      };
      const action = new FetchSkusFailure(serverErrors);

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Add Sku', () => {
    it('should set adding to true and addErrors to empty', () => {
      const expected = {
        ...initialState,
        adding: true,
        addErrors: null
      };
      const action = new AddSku(<Sku><unknown>skuNew);

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });

  });

  describe('Add Sku Success', () => {
    it('should set adding to false', () => {
      const expected = false;
      const action = new AddSkuSuccess(skuAdded);

      const result = reducer(initialState, action);

      expect(result.adding).toEqual(expected);
    });

    it('should add the new sku to the existing entities', () => {
      const state = {
        ...initialState,
        entities: existingSkus.reduce((acc, sku) => {
          acc[sku.id] = sku;
          return acc;
        }, {}),
        ids: existingSkus.map((sku) => sku.id),
      };
      const expected = {
        ...state,
        entities: { ...state.entities, [skuAdded.id]: skuAdded },
        ids: [ ...state.ids, skuAdded.id ],
        adding: false,
      };
      const action = new AddSkuSuccess(skuAdded);

      const result = reducer(state, action);

      expect(result).toEqual(expected);
    });

  });

  describe('Add Sku Failure', () => {
    it('should set adding to false', () => {
      const expected = false;
      const action = new AddSkuFailure(serverErrors);

      const result = reducer(initialState, action);

      expect(result.adding).toEqual(expected);
    });

    it('should set addErrors to returned error object', () => {
      const expected = {
        ...initialState,
        addErrors: serverErrors,
      };
      const action = new AddSkuFailure(serverErrors);

      const result = reducer(initialState, action);

      expect(result).toEqual(expected);
    });

  });

});
