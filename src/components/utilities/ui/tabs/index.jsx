import { Button } from "../forms";
import { useUniqId } from "../../../../hooks";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useFirstMountState } from "react-use";

const useStyles = createUseStyles({
	content: {
		'&[id].active, &:not([id])': {
			display: 'unset',
			flex: 1,
			minHeight: '200px',
			width: '100%'
		},

		'&[id]': {
			display: 'none'
		}
	}
});

export const useContextTabs = () => {
	const [currentTab, setCurrentTab] = useState('');

	return {
		Tabs({children, onChange}) {
			const tabs = children.flat().reduce((r, c) => c.type.name === 'Tab' ? [...r, c] : r, []);
			const contents = children.flat().reduce((r, c) => c.type.name === 'Content' ? [...r, c] : r, []);

			const isFirstLoad = useFirstMountState();

			useEffect(() => {
				isFirstLoad && setCurrentTab(tabs[0]?.props.target) && onChange(currentTab);
			}, []);

			useEffect(() => {
				onChange && onChange(currentTab)
			}, [currentTab]);

			return (<div>
				<div className={'tabs'}>
					{tabs}
				</div>

				{contents}
			</div>);
		},

		Tab({children, onClick, active, target, icon = false}) {
			const handleClick = e => {
				e.stopPropagation();
				e.preventDefault();

				setCurrentTab(target);

				onClick && onClick(e)
			}

			return (
				<Button onClick={handleClick} className={{ icon: !!icon }} active={currentTab === target}>
					{icon ? (<i className={icon ?? ''}/>) : children}
				</Button>
			)
		},

		Content({children, id}) {
			const {content} = useStyles();
			const uniqId = useUniqId();

			return id ? (
				<div id={`${id}-${uniqId}`}
				     className={content + ` ${id === currentTab ? 'active' : ''}`}>
					{children}
				</div>) : (<div>{children}</div>)
		}
	};
};
