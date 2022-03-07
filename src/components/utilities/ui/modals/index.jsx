import { useKey } from "react-use";
import { useModal } from "../../../../hooks";
import { Modal as BSModal } from 'react-bootstrap';

export const Modal = ({header, footer, children, name, className = {}}) => {
	const {opened, close} = useModal(name);

	const [Header, Footer] = [header, footer];

	useKey('Escape', close);

	return (
		<BSModal size={"lg"} show={opened} onHide={close} centered className={className}>
			<BSModal.Header closeButton>
				{header && (<div>
					<Header />
				</div>)}
			</BSModal.Header>

			<BSModal.Body>
				{children}
			</BSModal.Body>

			{footer && (<BSModal.Footer>
				<Footer />
			</BSModal.Footer>)}
		</BSModal>
	);
};
