import { createSlice } from "@reduxjs/toolkit";

let check = false;

const ModelSlice = createSlice({
  name: "Model",
  initialState: {
    content: "",
    title: "",
    show: false,
    forceShowContent: false,
    currId: null,
    showVid: false,
    forceTitle: "",
    forceContent: "",
    forceVidUrl: "",
    AllAuds: [],
    AllChaps: [{ id: 0 }],
    currChapter: 0,
  },
  reducers: {
    setContent: (state, action) => {
      if (!state.forceShowContent) {
        state.show = true;
        state.title =
          state.allContent[action.payload.id][action.payload.index].title;
        state.content =
          state.allContent[action.payload.id][action.payload.index].content;
        state.currId = [action.payload.id, action.payload.index];
        if (state.allVids[action.payload.id][action.payload.index].vid) {
          state.showVid = true;
          state.forceVidUrl =
            state.allVids[action.payload.id][action.payload.index].vid;
        }
      }
    },
    removeContent: (state, action) => {
      if (!state.forceShowContent) {
        state.show = action.payload;
        state.title = "";
        state.content = "";
        state.currId = null;
      }
    },
    changeContent: (state, action) => {
      if (state.forceShowContent) {
        const title = action.payload.title;
        const content = action.payload.content;

        state.forceContent = content;
        state.forceTitle = title;
      } else {
        const title = action.payload.title;
        const content = action.payload.content;
        const currId = action.payload.id;
        state.content = content;
        state.title = title;
        state.allContent[currId[0]][currId[1]].title = title;
        state.allContent[currId[0]][currId[1]].content = content;
      }
    },
    forceShow: (state, action) => {
      state.forceTitle = action.payload.title;
      state.forceContent = action.payload.content;
      state.showVid = action.payload.showVid;
      state.forceShowContent = true;
      state.show = true;
    },
    forceVid: (state, action) => {
      if (!state.currId) {
        state.forceVidUrl = action.payload;
      } else {
        state.allVids[state.currId[0]][state.currId[1]].vid = action.payload;
      }
      state.showVid = true;
    },
    forceRemove: (state, action) => {
      state.forceShowContent = false;
      state.show = action.payload;
    },
    forceRemoveVid: (state) => {
      state.showVid = false;
    },
    removeShow: (state) => {
      state.currId = undefined;
      state.show = false;
    },
    changeFrame: (state, action) => {
      if (state.currId) {
        state.allFrames[state.currId[0]][state.currId[1]].img = action.payload;
      }
    },
    quickShow: (state) => {
      state.forceShowContent = true;
      state.show = true;
      if (state.forceVidUrl.length !== 0) {
        state.showVid = true;
      }
    },
    SetCurrAudio: (state, action) => {
      state.AllAuds[state.currChapter] = action.payload;
    },
    addChapters: (state, action) => {
      state.AllChaps.push({ id: action.payload });
    },
    changeBox1: (state, action) => {
      state.currChapter = action.payload;
    },
    setZero:(state)=>{
      state.currChapter = 0
    }
  },
});

export const {
  setContent,
  removeContent,
  changeContent,
  forceShow,
  forceVid,
  forceRemove,
  forceRemoveVid,
  changeFrame,
  removeShow,
  SetCurrAudio,
  quickShow,
  addChapters,
  changeBox1,
  setZero
} = ModelSlice.actions;

export default ModelSlice.reducer;
