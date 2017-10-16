package pt.example.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_CONF_OP_NPREV")
public class RP_CONF_OP_NPREV {

	private Integer ID_CONF_OP_NPREV;
	private String ID_OP;
	private String NOME_OP;
	private String SECNUMENR1_OP;

	@Id
	@Column(name = "ID_CONF_OP_NPREV")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_CONF_OP_NPREV() {
		return ID_CONF_OP_NPREV;
	}

	@Column(name = "ID_OP")
	public String getID_OP() {
		return ID_OP;
	}

	@Column(name = "NOME_OP")
	public String getNOME_OP() {
		return NOME_OP;
	}

	@Column(name = "SECNUMENR1_OP")
	public String getSECNUMENR1_OP() {
		return SECNUMENR1_OP;
	}

	public void setSECNUMENR1_OP(String sECNUMENR1_OP) {
		SECNUMENR1_OP = sECNUMENR1_OP;
	}

	public void setNOME_OP(String name_OP) {
		NOME_OP = name_OP;
	}

	public void setID_CONF_OP_NPREV(Integer iD_CONF_OP_NPREV) {
		ID_CONF_OP_NPREV = iD_CONF_OP_NPREV;
	}

	public void setID_OP(String iD_OP) {
		ID_OP = iD_OP;
	}

}
