const asyncHandler = (builder, actionType, successHandler) => {
  builder
    .addCase(actionType.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(actionType.fulfilled, (state, action) => {
      state.isLoading = false;
      
      if (successHandler) {
        successHandler(state, action); // Call custom success handler
      } else {
        state.products = action.payload; // Default behavior
      }
    })
    .addCase(actionType.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || action.error.message; // Capture error message
    });
};

export default asyncHandler;
