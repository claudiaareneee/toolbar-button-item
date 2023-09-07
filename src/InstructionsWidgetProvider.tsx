/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import { StagePanelLocation, StagePanelSection, UiItemsProvider, Widget, WidgetState } from "@itwin/appui-react";
import { Alert } from "@itwin/itwinui-react";

export const InstructionsWidget = () => {
  return (
    <Alert type="informational" style={{ margin: "16px" }}>
      Press the Lightbulb button tool at the top of the screen.
    </Alert >
  );
};

export class InstructionsWidgetProvider implements UiItemsProvider {
  public readonly id: string = "ToolbarButtonInstructionsWidgetProvider";

  public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (location === StagePanelLocation.Bottom && _section === StagePanelSection.Start) {
      widgets.push(
        {
          id: "ToolbarButtonInstructionsWidget",
          label: "Instructions",
          defaultState: WidgetState.Open,
          content: <InstructionsWidget />,
        });
    }
    return widgets;
  }
}
