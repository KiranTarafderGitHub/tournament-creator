package com.tournament.creator.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	private static final Log log = LogFactory.getLog(HomeController.class);

	
	@GetMapping("/login")
	public ModelAndView login(ModelAndView model)
	{
		model.setViewName("login");
        return model;
	}
	
	@GetMapping("/")
	public ModelAndView home(ModelAndView model)
	{
		try {
			model.setViewName("landing");
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
        return model;
	}
	
	@GetMapping("/logout")
	public ModelAndView logout(ModelAndView model)
	{
		model.setViewName("login");
        return model;
	}
}
