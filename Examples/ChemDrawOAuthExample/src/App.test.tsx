//
// App.test.tsx
//
// Copyright © 2019-2023 Revvity Signals Software, Inc. All rights reserved.
//

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
