package pt.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_CONF_CHEF_SEC")
public class RP_CONF_CHEF_SEC {

	private Integer ID_CONF_CHEF_SEC;
	private String ID_UTZ;
	private String SEC_NUM;
	public String NOME_UTZ;
	public String NOME_SEC;
	
	

	@Id
	@Column(name = "ID_CONF_CHEF_SEC")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_CONF_CHEF_SEC() {
		return ID_CONF_CHEF_SEC;
	}
	
	@Column(name = "ID_UTZ")
	public String getID_UTZ() {
		return ID_UTZ;
	}

	@Column(name = "SEC_NUM")
	public String getSEC_NUM() {
		return SEC_NUM;
	}
	@Column(name = "NOME_UTZ")
	public String getNOME_UTZ() {
		return NOME_UTZ;
	}
	
	@Column(name = "NOME_SEC")
	public String getNOME_SEC() {
		return NOME_SEC;
	}

	public void setNOME_UTZ(String nOME_UTZ) {
		NOME_UTZ = nOME_UTZ;
	}

	public void setNOME_SEC(String nOME_SEC) {
		NOME_SEC = nOME_SEC;
	}

	public void setID_CONF_CHEF_SEC(Integer iD_CONF_CHEF_SEC) {
		ID_CONF_CHEF_SEC = iD_CONF_CHEF_SEC;
	}

	public void setID_UTZ(String iD_UTZ) {
		ID_UTZ = iD_UTZ;
	}

	public void setSEC_NUM(String sEC_NUM) {
		SEC_NUM = sEC_NUM;
	}

}
