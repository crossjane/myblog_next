import { createSelector, createSlice } from "@reduxjs/toolkit";

// slice의 초기상태.
const initialState = {
  me: null,
};

// 상태 바꿀때 쓸 함수들. state는 initialState, action은 dispatch로 전달된 객체.
// 프론트에서 dispatch로 액션 날림 -> state변경하기.
const reducers = {
  setMe: (state, action) => {
    state.me = action.payload;
  },
};

// redux툴킷에서 slice 만드는 함수.
const name = "auth";
export const authSlice = createSlice({
  name,
  initialState,
  reducers,
});

// redux상태에서 특정 값을 효율적으로 추출하는 selector함수.
const selectGetMeState = createSelector(
  // 첫번쨰 인자:me값꺼냄
  (state) => state.me,
  //   두번쨰 인자 return 포맷조정.
  (me) => {
    return {
      me,
    };
  }
);

export const auth = authSlice.name;
export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;

// redux store에서 관련 상태를 꺼내서 가져오는 함수
// 실제로 컴포넌트에서 쓸 selextor 함수.
export const authSelector = {
  getMe: (state) => selectGetMeState(state[auth]),
};
