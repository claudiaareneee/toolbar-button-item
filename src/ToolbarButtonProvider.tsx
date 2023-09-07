/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  CommandItemDef,
  StageUsage,
  ToolbarHelper,
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SvgLightbulbHollow } from "@itwin/itwinui-icons-react";
import { toaster } from "@itwin/itwinui-react";

const displayInfoToast = (message: string) => {
  toaster.setSettings({
    placement: "top-end",
    order: "descending",
  });

  toaster.informational(message, {
    duration: 3000,
  });
};

const startTool = () => displayInfoToast("Hello from the toolbar button you added.");

export class ToolbarButtonProvider implements UiItemsProvider {
  public readonly id = "ToolbarButtonProvider";
  /** provideToolbarButtonItems() is called for each registered UI provider as the Frontstage is building toolbars. We are adding an action button to the ContentManipulation Horizontal toolbar
   * in General use Frontstages. For more information, refer to the UiItemsProvider and Frontstage documentation on imodeljs.org.
   */
  public provideToolbarItems(_stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation): ToolbarItem[] {
    if (stageUsage === StageUsage.General && toolbarUsage === ToolbarUsage.ContentManipulation && toolbarOrientation === ToolbarOrientation.Horizontal) {
      const toolbarItem = ToolbarHelper.createToolbarItemFromItemDef(1000,
        new CommandItemDef({ commandId: "Open message box", iconSpec: <SvgLightbulbHollow />, label: "Added Tool", execute: () => startTool() })
      );

      return [toolbarItem];
    }
    return [];
  }
}
