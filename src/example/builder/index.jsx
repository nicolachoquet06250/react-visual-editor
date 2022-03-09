import { Repeater } from "../../components/utilities/ui/boxes";
import { Col, Container, Row, DropdownButton, Dropdown, ButtonGroup, Button, Nav, Form } from "react-bootstrap";
import {useClickAway} from 'react-use';
import wording from './wording';
import React, {useEffect, useRef, useState} from "react";
import { FaIcon } from "../../enums/icons";
import { ComponentList } from '../../components/utilities/ui/lists/builder';
import { useEventHandler, useSimpleHandler } from "../../hooks/handlers";

export const MyComponent = ({text, select, texts, selected, component, onSend}) => {
	const [_text, setText] = useState(text ?? '');
	const [_select, setSelect] = useState(select ?? 'toto');
	const [_selectLabel, setSelectLabel] = useState(select ?? 'Toto');
	const [_texts, setTexts] = useState(texts ?? []);
	const [_selected, setSelected] = useState(selected ?? false);
	const [_component, setComponent] = useState(component ?? {});

	const input = useRef(null);

	useClickAway(input, () => {
		input.current.blur();
	});

	const [currentTab, setCurrentTab] = useState('coucou');

	const deleteText = useSimpleHandler(index =>
		setTexts(_texts.reduce((r, c, i) => index === i ? r : [...r, c], [])));

	const updateText = useEventHandler((e, i) =>
		setTexts(_texts.map((c, index) => i === index ? e.target.value : c)));

	useEffect(() => {
		onSend({
			data: {
				text: _text,
				select: _select,
				texts: _texts,
				selected: _selected,
				component: _component
			}
		})
	}, [_text, _select, _texts, _selected, _component]);

	const DeleteButton = ({i}) => (<Button variant={'outline-danger'} onClick={deleteText(i)}>
		<i className={FaIcon.TRASH} />
	</Button>);

	return (
		<div>
			<Container fluid={'sm'}>
				<Row>
					<Col>
						<Form>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>
									{wording.input.title}
								</Form.Label>

								<Form.Control type="text"
								              placeholder={wording.input.placeholder}
								              value={_text}
								              onChange={e => setText(e.target.value)}
											  onClick={e => e.target.focus()}
											  ref={input} onKeyDown={e => {
												if (e.code === 'Escape') {
													e.target.blur()
												}
											  }}/>
							</Form.Group>
						</Form>
					</Col>

					<Col>
						<h6>{wording.test_text.title}</h6>
						<span>{wording.test_text.text}</span>
					</Col>
				</Row>

				<Row>
					<Col>
						<DropdownButton as={ButtonGroup} id={`dropdown-secondary`}
										variant={'outline-secondary'} title={_selectLabel}>
							<Dropdown.Item eventKey="toto"
							               onClick={() => {
											   setSelect('toto');
											   setSelectLabel('Toto');
										   }}>
								Toto
							</Dropdown.Item>
							<Dropdown.Item eventKey="titi"
							               onClick={() => {
											   setSelect('titi');
											   setSelectLabel('Titi');
										   }}>
								Titi
							</Dropdown.Item>
							<Dropdown.Item eventKey="tata"
							               onClick={() => {
											   setSelect('tata');
											   setSelectLabel('Tata');
										   }}>
								Tata
							</Dropdown.Item>
						</DropdownButton>
					</Col>
				</Row>
			</Container>

			<Repeater title={'Repeater component title'} addLabel={'Add text'}
			          value={_texts} voidModel={''}
			          onChange={setTexts}>
				{_texts.map((_, i) => (<Row style={{ marginBottom: '5px' }} key={'repeater-row-' + i}>
					<Col>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control type="text"
							              placeholder={wording.repeater.input.placeholder}
							              value={_texts[i]}
							              onChange={updateText(i)}
										  onClick={e => e.target.focus()}
										  onKeyDown={e => {
										  	if (e.code === 'Escape') {
										  		e.target.blur();
											}
										  }}/>
						</Form.Group>
					</Col>

					<Col sm={3} style={{ textAlign: 'right' }}>
						<DeleteButton i={i} />
					</Col>
				</Row>))}
			</Repeater>

			<Container fluid={'sm'}>
				<Row>
					<Col>
						<hr />
					</Col>
				</Row>
			</Container>

			<Container fluid={'sm'}>
				<Row>
					<Col>
						<Nav justify variant="tabs" defaultActiveKey={"coucou"}>
							<Nav.Item>
								<Nav.Link href={'coucou'}
										  onClick={e => {
											  e.preventDefault();
											  setCurrentTab('coucou')
										  }}>
									Coucou
								</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Nav.Link href={'coucou2'}
										  onClick={e => {
											  e.preventDefault();
											  setCurrentTab('coucou2')
										  }}>
									Coucou 2
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
				</Row>

				{currentTab === 'coucou' && (<Row>
					<Container>
						Coucou

						<Form>
							<Form.Check
								defaultChecked={_selected}
								onChange={() => setSelected(!_selected)}
								type="switch"
								id="custom-switch"
								label="Un switch" />
						</Form>
					</Container>
				</Row>)}

				{currentTab === 'coucou2' && (<Row>
					<Container>
						Coucou 2
					</Container>
				</Row>)}
			</Container>

			<ComponentList defaultComponent={_component} onSend={setComponent} />
		</div>
	);
}

export const MySecondComponent = () => {
	return (<h5>
		Mon decond composant
	</h5>);
}
