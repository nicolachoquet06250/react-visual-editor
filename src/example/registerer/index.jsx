import { useEffect } from "react";
import { useFirstMountState } from "react-use";
import { useComponents } from "../../hooks";
import Preview from "../../logo.svg";
import {MyComponent as MyBuilderComponent, MySecondComponent as MySecondBuilderComponent} from '../builder';
import {MyComponent as MyUIComponent, MySecondComponent as MySecondUIComponent} from '../ui';

export const VisualEditorComponentsRegisterer = () => {
	const {register} = useComponents();

	const components = [
		{
			title: 'Mon composant de test',
			category: 'Test',
			data: {
				text: '',
				texts: [],
				selected: false,
				select: 'toto'
			},
			imagePreview: Preview,
			recursive: true,
			builderComponent: MyBuilderComponent,
			uiComponent: MyUIComponent
		},
		{
			title: 'Mon 2em composant',
			category: 'Test',
			data: {},
			imagePreview: Preview,
			recursive: false,
			builderComponent: MySecondBuilderComponent,
			uiComponent: MySecondUIComponent
		}
	];

	useEffect(() => {
		for(const component of components) register(component);
	});

	return (<></>)
};
