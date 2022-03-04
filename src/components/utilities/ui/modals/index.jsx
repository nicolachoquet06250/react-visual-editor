import { Button } from "../forms";
import { createUseStyles } from "react-jss";
import { useModal } from "../../../../hooks";
import { useEffect, useRef } from "react";
import { useClickAway, useKey } from "react-use";

const useStyles = createUseStyles({
	modal: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'rgba(0, 0, 0, .5)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		zIndex: 999,

		'&.closed': {
			display: 'none'
		},

		'& > .modal': {
			minWidth: '400px',
			maxWidth: 'calc(100% - 20px)',
			minHeight: '200px',
			maxHeight: 'calc(100vh - 20px)',
			background: 'white',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			paddingLeft: '5px',
			paddingRight: '5px',
			borderRadius: '5px',
			cursor: 'default',

			'& > main': {
				flex: 1,
				height: 'auto',
				overflowY: 'auto',
				width: '100%',
				padding: '5px'
			},

			'& > header, & > footer': {
				minHeight: '40px',
				height: 'auto',
				width: '100%',
				overflowY: 'auto',
				padding: '5px'
			},

			'& > header': {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderBottom: '1px solid lightblue',

				'&.not-header': {
					justifyContent: 'flex-end'
				},

				'& > button': {
					background: 'transparent',
					border: 'none',
					width: '30px',
					height: '30px',
					cursor: 'pointer'
				}
			},

			'& > footer': {
				borderTop: '1px solid lightblue'
			}
		}
	}
});

export const Modal = ({header, footer, children, name}) => {
	const {modal: modalStyle} = useStyles();

	const {opened, close} = useModal(name);

	const [Header, Footer] = [header, footer];

	const modalContent = useRef();

	useClickAway(modalContent, close);

	useKey('Escape', close);

	return (<div className={modalStyle + ` ${!opened ? 'closed' : ''}`}>
		<div className={'modal'} ref={modalContent}>
			<header className={`${!header ? 'not-header' : ''}`}>
				{header && (<div>
					<Header />
				</div>)}

				<Button circle={true}
				        noBorder={true}
				        close={true}
				        activeColor={'red'}
				        onClick={close} />
			</header>

			<main>
				{children}
			</main>

			{footer && (<footer>
				<Footer />
			</footer>)}
		</div>
	</div>);
};
