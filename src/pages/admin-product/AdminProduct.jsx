import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'


import EditIcon from "@mui/icons-material/Edit";
import NextIcon from '@mui/icons-material/NextPlan';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';


export const AdminProduct = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [rowModesModel, setRowModesModel] = useState({});

    const { data } = useQuery({
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/windows`,
                );

                return response.data;
            } catch (error) {
                console.log("Error detail: " + error);
                return [];
            }
        },
        queryKey: ["windows"],
    });

    const transformedData = data?.map((window) => ({
        id: window.id,
        name: window.name,
        description: window.description,
    }));


    const mutation = useMutation({
        mutationFn: async (newRow) => {
            const { id, ...data} = newRow
            try {
                console.log(newRow)
                await axios.patch(
                    `http://localhost:3000/windows/${id}`,
                    {
                        ...data
                    },
                    {
                        withCredentials: true,
                    }
                );
            } catch (error) {
                console.log("Error detail: " + error)
            }
        },
        onSuccess: () => {
            console.log("Success")
            queryClient.invalidateQueries(["windows"]);
        },
    });



    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "name",
            headerName: "Название модели",
            width: 180,
            editable: true,
        },
        {
            field: "description",
            headerName: "Описание",
            width: 180,
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Изменить",
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={() => handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={() => handleCancelClick(id)}
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<NextIcon />}
                        label="Next"
                        onClick={() => navigate(`${id}`)}
                    />
                ];
            },
        },
    ];

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const processRowUpdate = (newRow) => {
        mutation.mutate(newRow);
        return newRow;
    };

    const handleEditClick = (id) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = data.find((row) => row.id === id);
        // if (editedRow.isNew) {
        //   setRows(rows.filter((row) => row.id !== id));
        // }
    };

    const handleProcessRowUpdateError = (error) => {
        console.error("Error updating row:", error);
    };


    return (
        <DataGrid
            rows={transformedData || []}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
        />
    )
}
