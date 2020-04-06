import { WithMode } from './hocs/WithMode';
import { WithCompanion } from './hocs/WithCompanion';
import { ViewMode } from './chunks/ViewMode';
import { EditMode } from './chunks/EditMode';

export const Input = WithMode({
    view: WithCompanion(ViewMode),
    edit: WithCompanion(EditMode)
});