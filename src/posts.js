// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import ContentFilter from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import { Box, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NullableBooleanInput, useListContext } from 'react-admin';
import { TopToolbar, ExportButton } from 'react-admin';

const PostFilterButton = () => {
    const { showFilter } = useListContext();
    return (
        <Button
            size="small"
            color="primary"
            onClick={() => showFilter("main")}
            startIcon={<ContentFilter />}
        >
            Filter
        </Button>
    );
};

const PostFilterForm = () => {
    const {
        displayedFilters,
        filterValues,
        setFilters,
        hideFilter
    } = useListContext();

    const form = useForm({
        defaultValues: filterValues,
    });

    if (!displayedFilters.main) return null;

    const onSubmit = (values) => {
        if (Object.keys(values).length > 0) {
            setFilters(values);
        } else {
            hideFilter("main");
        }
    };

    const resetFilter = () => {
        setFilters({}, []);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box display="flex" alignItems="flex-end" mb={1}>
                <Box component="span" mr={2}>
                    {/* Full-text search filter. We don't use <SearchFilter> to force a large form input */}
                    <TextInput
                        resettable
                        helperText={false}
                        source="q"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <Box component="span" mr={2}>
                    {/* Commentable filter */}
                    <NullableBooleanInput
                        helperText={false}
                        source="commentable"
                    />
                </Box>
                <Box component="span" mr={2} mb={1.5}>
                    <Button variant="outlined" color="primary" type="submit">
                        Filter
                    </Button>
                </Box>
                <Box component="span" mb={1.5}>
                    <Button variant="outlined" onClick={resetFilter}>
                        Close
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

const ListActions = () => (
    <Box width="100%">
        <TopToolbar>
            <PostFilterButton />
            <ExportButton />
        </TopToolbar>
        <PostFilterForm />
    </Box>
);

export const PostIcon = BookIcon;

export const PostList = () => (
    <List actions={<ListActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
