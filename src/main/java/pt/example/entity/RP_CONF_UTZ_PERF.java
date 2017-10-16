package pt.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_CONF_UTZ_PERF")
public class RP_CONF_UTZ_PERF {

	private Integer ID_CONF_UTZ_PERF;
	private String ID_UTZ;
	private String PERFIL;
	private String NOME_UTZ;
	
	@Id
	@Column(name = "ID_CONF_UTZ_PERF")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_CONF_UTZ_PERF() {
		return ID_CONF_UTZ_PERF;
	}
	
	@Column(name = "ID_UTZ")
	public String getID_UTZ() {
		return ID_UTZ;
	}


	@Column(name = "NOME_UTZ")
	public String getNOME_UTZ() {
		return NOME_UTZ;
	}

	public void setNOME_UTZ(String nOME_UTZ) {
		NOME_UTZ = nOME_UTZ;
	}

	@Column(name = "PERFIL")
	public String getPERFIL() {
		return PERFIL;
	}

	public void setID_CONF_UTZ_PERF(Integer ID_CONF_UTZ_PERF) {
		this.ID_CONF_UTZ_PERF = ID_CONF_UTZ_PERF;
	}

	public void setID_UTZ(String iD_UTZ) {
		ID_UTZ = iD_UTZ;
	}

	public void setPERFIL(String PERFIL) {
		this.PERFIL = PERFIL;
	}
	

}
