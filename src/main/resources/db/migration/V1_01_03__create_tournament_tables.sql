-- Player/team/group
CREATE TABLE `group_lu` (
  `id`           int(11)       NOT NULL AUTO_INCREMENT,
  `name`         varchar(100)  NOT NULL,
  `group_type`   varchar(20)   NOT NULL,
  
  PRIMARY KEY (`id`)
 
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


CREATE TABLE `team` (
  `id`           int(11)       NOT NULL AUTO_INCREMENT,
  `name`         varchar(100)  NOT NULL,
  `gruop_id`     int,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (gruop_id) REFERENCES group_lu(id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `player` (
  `id`           int(11)       NOT NULL AUTO_INCREMENT,
  `name`         varchar(100)  NOT NULL,
  `team_id`      int,
  `gruop_id`     int,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE SET NULL,
  FOREIGN KEY (gruop_id) REFERENCES group_lu(id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;



