import { useComponents } from "../../hooks";
import Preview from "../../logo.svg";
import {MyComponent as MyBuilderComponent} from '../builder';
import {MyComponent as MyUIComponent} from '../ui';

export const VisualEditorComponentsRegisterer = () => {
	const {register} = useComponents();

	register({
		title: 'Mon composant de test',
		category: 'Test',
		data: {},
		imagePreview: Preview,
		recursive: false,
		builderComponent: MyBuilderComponent,
		uiComponent: MyUIComponent
	});

	return (<></>)
};
