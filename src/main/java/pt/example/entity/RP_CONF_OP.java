package pt.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_CONF_OP")
public class RP_CONF_OP {

	private Integer ID_CONF_OP;
	private String ID_OP_PRINC;
	private String ID_OP_SEC;
	private String NOME_OP_SEC;
	private String NOME_OP_PRINC;

	@Id
	@Column(name = "ID_CONF_OP")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_CONF_OP() {
		return ID_CONF_OP;
	}

	@Column(name = "ID_OP_PRINC")
	public String getID_OP_PRINC() {
		return ID_OP_PRINC;
	}

	@Column(name = "ID_OP_SEC")
	public String getID_OP_SEC() {
		return ID_OP_SEC;
	}

	@Column(name = "NOME_OP_SEC")
	public String getNOME_OP_SEC() {
		return NOME_OP_SEC;
	}

	@Column(name = "NOME_OP_PRINC")
	public String getNOME_OP_PRINC() {
		return NOME_OP_PRINC;
	}

	public void setNOME_OP_SEC(String nOME_OP_SEC) {
		NOME_OP_SEC = nOME_OP_SEC;
	}

	public void setNOME_OP_PRINC(String nOME_OP_PRINC) {
		NOME_OP_PRINC = nOME_OP_PRINC;
	}

	public void setID_CONF_OP(Integer ID_CONF_OP) {
		this.ID_CONF_OP = ID_CONF_OP;
	}

	public void setID_OP_PRINC(String ID_OP_PRINC) {
		this.ID_OP_PRINC = ID_OP_PRINC;
	}

	public void setID_OP_SEC(String ID_OP_SEC) {
		this.ID_OP_SEC = ID_OP_SEC;
	}
}
