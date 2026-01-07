package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.entity.Project;
import com.ems.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
//
//	@Override
//	public List<Project> saveProjectDetails(Project project) {
//		// TODO Auto-generated method stub
//		return projectRepository.saveAll(project);
//	}

//	@Override
//	public Project saveProjectDetails(Project project) {
//		// TODO Auto-generated method stub
//		return projectRepository.save(project);
//	}

		public void saveProjectDetails(List<Project> projectDetails) {
	    for (Project project : projectDetails) {
	        // Handle each project
	        projectRepository.save(project);
	    }
	}


}
