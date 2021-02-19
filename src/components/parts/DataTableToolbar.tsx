import { IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineLeft, AiOutlinePlus } from 'react-icons/ai';

interface DataTableToolbarProps {
    title: string;
    uninsertable?: boolean;
    undeletable?: boolean;
    insert?: VoidFunction;
    remove?: VoidFunction;
    goBack?: VoidFunction;
}

const useStyles = makeStyles((theme) => ({
    root: {
        //
    },
    title: {
        //
    },
    action: {
        //
    },
}));

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
    title,
    uninsertable,
    undeletable,
    insert,
    remove,
    goBack,
}) => {
    const classes = useStyles();
    return (
        <Toolbar className={classes.root} disableGutters>
            {goBack && (
                <Tooltip title="戻る">
                    <IconButton onClick={goBack}>
                        <AiOutlineLeft />
                    </IconButton>
                </Tooltip>
            )}
            <Typography className={classes.title} variant="h6" component="h2">
                {title}
            </Typography>
            {!uninsertable && (
                <Tooltip title="追加">
                    <IconButton onClick={insert}>
                        <AiOutlinePlus />
                    </IconButton>
                </Tooltip>
            )}
            {!undeletable && (
                <Tooltip title="削除">
                    <IconButton onClick={remove}>
                        <AiOutlineDelete />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export default DataTableToolbar;
