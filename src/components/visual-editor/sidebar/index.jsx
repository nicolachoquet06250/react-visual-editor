import './index.css';
import {createUseStyles} from 'react-jss';
import {Button} from '../../utilities/ui/forms';
import {FaIcon} from '../../../enums/icons';
import {Modals} from '../../../enums';
import {useComponents, useModal} from '../../../hooks';
import {useToggle} from 'react-use';

const useStyles = createUseStyles({
    header: {
        height: '40px',
        width: '100%',
        borderBottom: '1px solid lightblue',

        '& > div': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '5px',
            height: '100%'
        },

        '& button': {
            width: '30px',
            height: '30px',
            borderRadius: '30px',
            background: 'white',
            border: '1px solid black',
            cursor: 'pointer'
        }
    },

    openCloseButton: {
        border: '1px solid black',
        padding: '5px',
        position: 'absolute',
        top: '5px',
        right: 0,
        opacity: 0,
        transition: 'opacity .5s ease-out',
        background: 'rgba(255, 255, 255, .3)',
        transform: 'translateX(calc(100% + 10px))',

        '&:hover': {
            opacity: 1
        },

        '&.close': {
            transform: 'translateX(calc(100% + 15px))'
        }
    },

    main: {
        height: 'calc(100% - 90px)',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '5px'
    },

    componentBuilderCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        border: '1px solid lightblue',
        borderRadius: '5px',
        backgroundColor: 'rgb(255, 255, 255)',
        transition: 'background-color .2s ease-out',

        '& > header': {
            cursor: 'pointer',
            height: '40px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        '& > main': {
            display: 'none'
        },

        '&.opened > main': {
            width: '100%',
            display: 'flex'
        },

        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .3)'
        }
    },

    footer: {
        height: '50px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTop: '1px solid lightblue',

        '& button': {
            marginRight: '5px'
        }
    }
});

export const VisualEditorSidebar = ({onClose, onOpen, onSend}) => {
    const {pageComponents: components, setData, unregisterFromPage: unregisterComponent} = useComponents();
    //const {open: openAddComponentModal} = useModal(Modals.AddComponent);
    //const {open: openValidateDataModal} = useModal(Modals.ValidateData);

    const {header, main, footer, openCloseButton, componentBuilderCard} = useStyles();

    const [isOpened, toggleOpened] = useToggle(true);

    const handleToggleSidebar = () => {
        isOpened ? onClose() : onOpen();
        toggleOpened();
    };

    const handleSend = () => {
        onSend({
            data: components.reduce((r, c) => [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], [])
        });
        //openValidateDataModal();
    };

    const sendComponentData = (title, i, e) => {
        // console.log(title, i, e.data);
        setData(i, e.data);
    };

    const handleDeleteComponent = index => {
        // console.log(title, index);
        unregisterComponent(index);
    };

    const handleExport = () => {
        const data = components.value.reduce((r, c) => [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], []);
        const _data = JSON.stringify(data)
        const blob = new Blob([_data], {type: 'text/plain'})
        const a = document.createElement('a');
        a.download = "page-data.json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.dispatchEvent(new MouseEvent('click', { cancelable: false }));
    };

    const getParent = (tag, root) => root?.parentElement?.tagName.toLowerCase() === tag ? root?.parentElement : getParent(tag, root?.parentElement);

    const toggleOpenCard = e => {
        const section = getParent('section', e.target);
        section?.classList[(section?.classList.contains('opened') ? 'remove' : 'add')]('opened');
        console.log(e.target, section);
    };

    return (
        <>
            <header className={header}>
                <div>
                    <Button circle={true} icon={FaIcon.PLUS} />
                </div>

                <Button className={openCloseButton + ` ${isOpened ? 'open' : 'close'}`} 
                        circle={true} 
                        icon={isOpened ? FaIcon.LOCK : FaIcon.LOCK_OPEN}
                        onClick={handleToggleSidebar} />
            </header>

            <main className={main}>
                components
                {components.map((builderComponent, i) => {
                    return (
                        <section className={componentBuilderCard} 
                                 style={i > 0 ? 'margin-right: 5px;' : ''}>
                            <header onClick={toggleOpenCard}>
                                
                            </header>
                        </section>
                    )
                })}
            </main>

            <footer className={footer}>
                <Button circle={false} 
                        icon={FaIcon.EXPORT}
                        onClick={handleExport}> Export</Button>

                <Button circle={true} 
                        icon={FaIcon.SEND}
                        onClick={handleSend} />
            </footer>
        </>
    )
};