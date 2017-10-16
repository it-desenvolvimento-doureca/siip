package pt.example.entity;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_CONF_EQUIP")
public class RP_CONF_EQUIP {

	private Integer ID_CONF_EQUIPA;
	private Time HORA_INI;
	private Time HORA_FIM;
	
	@Id
	@Column(name = "ID_CONF_EQUIPA")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_CONF_EQUIPA() {
		return ID_CONF_EQUIPA;
	}
	
	@Column(name = "HORA_INI")
	public Time getHORA_INI() {
		return HORA_INI;
	}

	@Column(name = "HORA_FIM")
	public Time getHORA_FIM() {
		return HORA_FIM;
	}

	public void setID_CONF_EQUIPA(Integer ID_CONF_EQUIPA) {
		ID_CONF_EQUIPA = ID_CONF_EQUIPA;
	}

	public void setHORA_INI(Time HORA_INI) {
		HORA_INI = HORA_INI;
	}

	public void setHORA_FIM(Time HORA_FIM) {
		HORA_FIM = HORA_FIM;
	}

}
