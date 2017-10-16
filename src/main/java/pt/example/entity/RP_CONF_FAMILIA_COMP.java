package pt.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "RP_CONF_FAMILIA_COMP")
public class RP_CONF_FAMILIA_COMP {

	private String COD_FAMILIA_COMP;
	private String NOME_FAMILIA_COMP;
	
	@Id
	@Column(name = "COD_FAMILIA_COMP")
	public String getCOD_FAMILIA_COMP() {
		return COD_FAMILIA_COMP;
	}

	public void setCOD_FAMILIA_COMP(String cOD_FAMILIA_COMP) {
		COD_FAMILIA_COMP = cOD_FAMILIA_COMP;
	}

	@Column(name = "NOME_FAMILIA_COMP")
	public String getNOME_FAMILIA_COMP() {
		return NOME_FAMILIA_COMP;
	}

	public void setNOME_FAMILIA_COMP(String nOME_FAMILIA_COMP) {
		NOME_FAMILIA_COMP = nOME_FAMILIA_COMP;
	}

}
