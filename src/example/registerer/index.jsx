import { useComponents } from "../../hooks";
import Preview from "../../logo.svg";
import {MyComponent as MyBuilderComponent, MySecondComponent as MySecondBuilderComponent} from '../builder';
import {MyComponent as MyUIComponent} from '../ui';

export const VisualEditorComponentsRegisterer = () => {
	const {register} = useComponents();

	register({
		title: 'Mon composant de test',
		category: 'Test',
		data: {},
		imagePreview: Preview,
		recursive: true,
		builderComponent: MyBuilderComponent,
		uiComponent: MyUIComponent
	});

	register({
		title: 'Mon 2em composant',
		category: 'Test',
		data: {},
		imagePreview: Preview,
		recursive: false,
		builderComponent: MySecondBuilderComponent,
		uiComponent: MyUIComponent
	});

	return (<></>)
};
