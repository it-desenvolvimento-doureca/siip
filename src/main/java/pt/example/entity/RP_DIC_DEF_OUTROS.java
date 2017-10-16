package pt.example.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_DIC_DEF_OUTROS")
public class RP_DIC_DEF_OUTROS {

	private Integer ID_DEF_OUTRO;
	private String DESC_DEF_OUTRO;
	
	
	@Id
	@Column(name = "ID_DEF_OUTRO")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_DEF_OUTRO() {
		return ID_DEF_OUTRO;
	}
	
	@Column(name = "DESC_DEF_OUTRO")
	public String getDESC_DEF_OUTRO() {
		return DESC_DEF_OUTRO;
	}


	public void setID_DEF_OUTRO(Integer ID_DEF_OUTRO) {
		ID_DEF_OUTRO = ID_DEF_OUTRO;
	}

	public void setDESC_DEF_OUTRO(String DESC_DEF_OUTRO) {
		DESC_DEF_OUTRO = DESC_DEF_OUTRO;
	}


}
