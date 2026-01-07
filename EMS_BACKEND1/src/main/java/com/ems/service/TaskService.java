package com.ems.service;

import com.ems.dto.TaskDTO;

import java.util.List;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO getTaskById(Long taskId);
    List<TaskDTO> getAllTasks();
    List<TaskDTO> getTasksByEmployeeId(Long employeeId);
    List<TaskDTO> getTasksByStatus(String status);
    List<TaskDTO> getTasksByPriority(String priority);
    TaskDTO updateTask(Long taskId, TaskDTO taskDTO);
    void deleteTask(Long taskId);
}
