import { useAuth } from "@/shared/hooks/useAuth";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { api } from "@/shared/api";

export const AdminRequest = () => {
  const user = useAuth();
  const [status, setStatus] = useState(null);
  const queryClient = useQueryClient();
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    switch (user?.roles[0]) {
      case "admin":
      case "manager":
        setStatus("all");
        break;
      case "worker":
        setStatus("work");
        break;
      default:
        setStatus("all");
    }
  }, [user]);

  const { data } = useQuery({
    queryFn: async () => {
      try {
        const response = await api.get(`user-requests?status=${status}`, {
          withCredentials: true,
        });

        return response.data;
      } catch (error) {
        console.log("Error detail: " + error);
        return [];
      }
    },
    queryKey: ["requests", status],
    enabled: !!status,
  });

  const transformedData =
    data?.map((request) => ({
      ...request,
      measurement_date: request.detail.measurement_date,
      instalation_date: request.detail.instalation_date,
      status: request.detail.status,
      item_name: request.detail.item.name,
      item_width: request.detail.options.width,
      item_height: request.detail.options.height,
    })) || [];

  const mutation = useMutation({
    mutationFn: async (newRow) => {
      const {
        id,
        measurement_date,
        instalation_date,
        item_name,
        item_width,
        item_height,
        status,
        ...rest
      } = newRow;
      await api.patch(
        `user-requests/${id}`,
        {
          ...rest,
          detail: {
            measurement_date,
            instalation_date,
            status,
            options: { width: item_width, height: item_height },
            item: { name: item_name },
          },
        },
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests", status]);
    },
  });

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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "fullname",
      headerName: "Полное имя",
      width: 180,
      editable: true,
    },
    {
      field: "email",
      headerName: "Почта",
      width: 180,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Телефон",
      width: 150,
      editable: true,
    },
    {
      field: "address",
      headerName: "Адресс",
      width: 200,
      editable: true,
    },
    {
      field: "item_name",
      headerName: "Продукт",
    },
    {
      field: "item_width",
      headerName: "Ширина",
      width: 120,
      editable: true,
    },
    {
      field: "item_height",
      headerName: "Высота",
      width: 120,
      editable: true,
    },
    {
      field: "measurement_date",
      headerName: "Дата замера",
      width: 180,
      editable: true,
      type: "dateTime",
      valueGetter: (params) => {
        if (!params) {
          return null;
        }
        return params ? new Date(params) : null;
      },
    },
    {
      field: "instalation_date",
      headerName: "Дата установки",
      width: 180,
      editable: true,
      type: "dateTime",
      valueGetter: (params) => {
        if (!params) {
          return null;
        }
        return params ? new Date(params) : null;
      },
    },
    {
      field: "status",
      headerName: "Статус",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["pending", "preparing", "work", "done", "canceled"],
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
        ];
      },
    },
  ];

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

    const editedRow = data.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleProcessRowUpdateError = (error) => {
    console.error("Error updating row:", error);
  };

  return (
    <Box>
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
    </Box>
  );
};
