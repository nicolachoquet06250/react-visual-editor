import { Repeater, SimpleBox } from "../../components/utilities/ui/boxes";
import { Col, Container, Row, DropdownButton, Dropdown, ButtonGroup, Button, Nav, Form } from "react-bootstrap";
import wording from './wording';
import { Text } from "../../components/utilities/ui/forms";
import { useState } from "react";
import { FaIcon } from "../../enums/icons";
import { ComponentList } from '../../components/utilities/ui/lists/builder';

export const MyComponent = ({text, select, texts, selected, component}) => {
	const [_text, setText] = useState(text ?? '');
	const [_select, setSelect] = useState(select ?? 'toto');
	const [_selectLabel, setSelectLabel] = useState(select ?? 'Toto');
	const [_texts, setTexts] = useState(texts ?? []);
	const [_selected, setSelected] = useState(selected ?? false);
	const [_component, setComponent] = useState(component ?? {});

	const [currentTab, setCurrentTab] = useState('coucou');

	const sendData = () => {}

	const deleteText = index => {
		console.log(_texts.reduce((r, c, i) => index === i ? r : [...r, c], []))
		setTexts(_texts.reduce((r, c, i) => index === i ? r : [...r, c], []));
	};

	const updateText = i => e => {
		setTexts(_texts.map((c, index) => i === index ? e.target.value : c))
	};

	const changeTexts = e => {
		setTexts(e);
		sendData();
	};

	const DeleteButton = ({i}) => (
		<Button variant={'outline-danger'}
		        onClick={() => deleteText(i)}>
			<i className={FaIcon.TRASH} />
		</Button>
	);

	return (
		<div>
			<SimpleBox p0={true}>
				<Container>
					<Row>
						<Col>
							<h6>{wording.input.title}</h6>
							<Text value={_text}
							      placeholder={wording.input.placeholder}
							      onUpdate={setText} onInput={sendData}/>
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
								<Dropdown.Item eventKey="toto" onClick={() => {setSelect('toto'); setSelectLabel('Toto')}}>
									Toto
								</Dropdown.Item>
								<Dropdown.Item eventKey="titi" onClick={() => {setSelect('titi'); setSelectLabel('Titi')}}>
									Titi
								</Dropdown.Item>
								<Dropdown.Item eventKey="tata" onClick={() => {setSelect('tata'); setSelectLabel('Tata')}}>
									Tata
								</Dropdown.Item>
							</DropdownButton>
						</Col>
					</Row>
				</Container>

				<Repeater title={'Repeater component title'} addLabel={'Add text'}
				          value={_texts} voidModel={''}
				          onChange={changeTexts}>
					{_texts.map((_, i) => (<Row style={{ marginBottom: '5px' }} key={'repeater-row-' + i}>
						<Col>
							<Text value={_texts[i]} 
								  onInput={updateText(i)} 
								  placeholder={wording.repeater.input.placeholder} />
						</Col>

						<Col sm={3} style={{ textAlign: 'right' }}>
							<DeleteButton i={i} />
						</Col>
					</Row>))}
				</Repeater>

				<Container>
					<Row>
						<Col>
							<hr />
						</Col>
					</Row>
				</Container>

				<SimpleBox py={5}>
					<Container>
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
				</SimpleBox>

				<ComponentList defaultComponent={_component} onSend={e => {
					setComponent(e);
					sendData();
				}} />
			</SimpleBox>
		</div>
	);
}

export const MySecondComponent = () => {
	return (<></>);
}