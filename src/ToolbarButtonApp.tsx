/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React, { useEffect } from "react";
import { UiFramework } from "@itwin/appui-react";
import { Viewer, ViewerNavigationToolsProvider } from "@itwin/web-viewer-react";
import { authClient } from "./common/AuthorizationClient";
import { mapLayerOptions } from "./common/MapLayerOptions";
import { ViewSetup } from "./common/ViewSetup";
import { InstructionsWidgetProvider } from "./InstructionsWidgetProvider";
import { ToolbarButtonProvider } from "./ToolbarButtonProvider";

const uiProviders = [
  new ToolbarButtonProvider(),
  new InstructionsWidgetProvider(),
  new ViewerNavigationToolsProvider(),
];
const viewportOptions = {
  viewState: ViewSetup.getDefaultView,
};

const iTwinId = process.env.IMJS_ITWIN_ID;
const iModelId = process.env.IMJS_IMODEL_ID;

const ToolbarButtonApp = () => {

  /** Sign-in */
  useEffect(() => {
    void authClient.signIn();
  }, []);

  /** The sample's render method */
  return <Viewer
    iTwinId={iTwinId ?? ""}
    iModelId={iModelId ?? ""}
    authClient={authClient}
    viewportOptions={viewportOptions}
    uiProviders={uiProviders}
    mapLayerOptions={mapLayerOptions}
    enablePerformanceMonitors={false}
    defaultUiConfig={
      {
        hideStatusBar: true,
        hideToolSettings: true,
      }
    }
    theme={process.env.THEME ?? "dark"}
  />;
};

// Define panel size
UiFramework.frontstages.onFrontstageReadyEvent.addListener((event) => {
  const { bottomPanel } = event.frontstageDef;
  bottomPanel && (bottomPanel.size = 120);
});

export default ToolbarButtonApp;
