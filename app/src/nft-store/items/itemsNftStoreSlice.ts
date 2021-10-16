import { StringPublicKey } from '@oyster/common';
import { createSlice } from '@reduxjs/toolkit';

import { PublicKey } from '@solana/web3.js'
import { RootState } from '../../app/store';
import { dummyItems } from './dummyItems';

export interface ItemNftData {
  address: PublicKey,
  game: PublicKey,
  name: string,
  description: string,
  image: string,
  price: number,
}

export interface ItemsNftStoreState {
  inProgress: StringPublicKey[],
  loaded: ItemNftData[],
  failed: StringPublicKey[]
}

const initialState: ItemsNftStoreState = {
  inProgress: [],
  loaded: [...dummyItems],
  failed: []
};

export const itemsNftStoreSlice = createSlice({
  name: 'itemsNftStore',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {

  },
});

const selectState = (state: RootState) => state.itemsNftStore;

export const selectNftItems = (rootState: RootState, items: StringPublicKey[]) =>
{
  const state = selectState(rootState)

  const itemsInProgress = state.inProgress.filter(x => items.find(a => a === x));
  const itemsLoaded = state.loaded.filter(x => items.find(a => a === x.address.toString()));
  const itemsFailed = state.failed.filter(x => items.find(a => a === x));
  console.log("qwqwqw", itemsLoaded)

  const result: Record<string, ItemState> = {};

  itemsInProgress.forEach(x => result[x.toString()] = { status: 'inProgress' })
  itemsLoaded.forEach(x => result[x.address.toString()] = { status: 'loaded', item: x })
  itemsFailed.forEach(x => result[x.toString()] = { status: 'failed' })

  return result;
}

export interface ItemState {
  status: ItemLoadingStatus,
  item?: ItemNftData
}

export type ItemLoadingStatus = 'inProgress' | 'loaded' | 'failed'



export default itemsNftStoreSlice.reducer;
